/* Import faunaDB sdk */
const faunadb = require('faunadb')
const flatten = require('lodash/flatten')
const padStart = require('lodash/padStart')
const q = faunadb.query

function getId(urlPath) {
  return urlPath.match(/([^\/]*)\/*$/)[0]
}

function mode(arr) {
  const counts = {};
  let maxCount = 0;
  let maxKey;
  // Count how many times each object (or really its string representation)
  // appears, and keep track of the highest count we've seen.
  for (let i = 0; i < arr.length; i++) {
    const key = arr[i];
    const count = (counts[key] = (counts[key] || 0) + 1);
    if (count > maxCount) {
      maxCount = count;
      maxKey = key;
    }
  }
  // Return (one of) the highest keys we've seen, or undefined.
  return maxKey;
}

/* export our lambda function as named "handler" export */
exports.handler = async function(event, context, callback) {
  let modeOfCoordinates = []
  /* configure faunaDB Client with our secret */
  const client = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET
  })

  const dateId = getId(event.path)
  console.log(`Function 'todo-read' invoked. Read id: ${dateId}`)

  const helper = client.paginate(
    q.Match(
      q.Index('clicks_by_date_xy'),
      dateId
    )
  )

  const pages = []
  await helper.each(function(page) {
    // Logs the page's contents,
    // for example: [ Ref(Collection("test"), "1234"), ... ]
    pages.push(page);
    modeOfCoordinates = mode(flatten(pages))
  })

  .then(() => {
    const x = modeOfCoordinates[0];
    const y = modeOfCoordinates[1];
    const response = {
      date: dateId,
      filename: `out256_${padStart(y, 2, '0')}_${padStart(x, 2, '0')}.jpg`,
      modeOfCoordinates,
    }
    return callback(null, {
      statusCode: 200,
      body: JSON.stringify(response)
    })
  }).catch((error) => {
    console.log("error", error)
    return callback(null, {
      statusCode: 400,
      body: JSON.stringify(error)
    })
  })
}