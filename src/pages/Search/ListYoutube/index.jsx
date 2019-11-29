import React from 'react';
import { Row, Col, Typography } from 'antd';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../../../store/maps';

const ListYoutube = ({ youtubeData, youtubeStatistics }) => {
  const templateList = youtubeData.items.map((element, index) => {
    const img = element.snippet.thumbnails.medium.url;
    const { title } = element.snippet;
    const { channelTitle } = element.snippet;
    const statistics = youtubeStatistics[index];

    return (
      <Typography key={Math.random()}>
        <Row gutter={20} className="List-Row">
          <Col span={6}>
            <img src={img} alt="" style={{ width: '100%', height: '100%' }} />
          </Col>

          <Col span={18}>
            <Typography.Title className="List-TitleVideo">
              <b>{title.replace(/&#39;/g, "'")}</b>
            </Typography.Title>

            <Typography.Title className="List-TitleChannel">
              {channelTitle}
            </Typography.Title>

            <Typography.Title className="List-StatisticVideo">
              {`${statistics} просмотров`}
            </Typography.Title>
          </Col>
        </Row>
      </Typography>
    );
  });

  return (
    <>
      {templateList.map((element) => element)}
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ListYoutube);
