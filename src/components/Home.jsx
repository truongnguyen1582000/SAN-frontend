import React from 'react';
import { UncontrolledCarousel } from 'reactstrap';

function Home(props) {
  return (
    <div>
      <UncontrolledCarousel
        style={{ height: '700px' }}
        items={[
          {
            key: 1,
            src: 'https://forum.idichvuseo.com/attachments/img_47-760x400-jpg.24270/',
          },
          {
            key: 2,
            src: 'https://minhmedia.vn/wp-content/uploads/2019/12/event-01.png',
          },
          {
            key: 3,
            src: 'https://cdn1.tuoitre.vn/zoom/600_315/2021/7/24/anh-bia-1627100537337291520570-crop-1627100583168569844332.jpg',
          },
        ]}
      />
    </div>
  );
}

export default Home;
