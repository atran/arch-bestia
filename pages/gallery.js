import range from 'lodash/range';

import Artist from '@components/Artist';

function Gallery() {
  return (
    <div className="container">
      <main className="side-page">
        <div class="artists">
          {
            range(21).map((idx) => (
              <Artist>
                {idx}
              </Artist>
            ))
          }
        </div>
      </main>
    </div>
  )
}

export default Gallery;