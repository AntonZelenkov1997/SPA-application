import React from 'react';
import { Typography, Row, Col } from 'antd';

const GridYoutube = ({ youtubeData, youtubeStatistics, isModalVisible }) => {
  const forRows = [];
  const columnsOfRow = [];
  const containerForRows = [];

  for (let index = 0; index < youtubeData.items.length; index++) {
    if (isModalVisible) {
      columnsOfRow[index] = (
        <Col span={6} key={`${Math.random()}`}>
          <div>
            <img
              src={youtubeData.items[index].snippet.thumbnails.medium.url}
              alt=""
              className="Grid-Picture"
            />
            <Typography.Title className="Grid-Title" key={`${Math.random()}`}>
              {youtubeData.items[index].snippet.title.toString().length >=
              25 ? (
                <b>{`${youtubeData.items[index].snippet.title
                  .toString()
                  .replace(/&#39;/g, "'")
                  .substr(0, 25)}...`}</b>
              ) : (
                <b>{`${youtubeData.items[index].snippet.title
                  .toString()
                  .replace(/&#39;/g, "'")
                  .substr(0, 25)}`}</b>
              )}
            </Typography.Title>

            <Typography.Title className="Grid-ChannelTitle">
              {youtubeData.items[index].snippet.channelTitle.toString()
                .length >= 25 ? (
                <b>{`${youtubeData.items[index].snippet.channelTitle
                  .toString()
                  .replace(/&#39;/g, "'")
                  .substr(0, 25)}...`}</b>
              ) : (
                <b>{`${youtubeData.items[index].snippet.channelTitle
                  .toString()
                  .replace(/&#39;/g, "'")
                  .substr(0, 25)}`}</b>
              )}
            </Typography.Title>

            <Typography.Title className="Grid-CountViews">
              <b>{`${youtubeStatistics[index]} просмотров`}</b>
            </Typography.Title>
          </div>
        </Col>
      );
    } else {
      columnsOfRow[index] = (
        <Col span={6} key={`${Math.random()}`}>
          <div>
            <img
              src={youtubeData.items[index].snippet.thumbnails.medium.url}
              alt=""
              className="Grid-Picture"
            />
            <Typography.Title className="Grid-Title" key={`${Math.random()}`}>
              {youtubeData.items[index].snippet.title.toString().length >=
              25 ? (
                <b>{`${youtubeData.items[index].snippet.title
                  .toString()
                  .replace(/&#39;/g, "'")
                  .substr(0, 25)}...`}</b>
              ) : (
                <b>{`${youtubeData.items[index].snippet.title
                  .toString()
                  .replace(/&#39;/g, "'")
                  .substr(0, 25)}`}</b>
              )}
            </Typography.Title>

            <Typography.Title className="Grid-ChannelTitle">
              {youtubeData.items[index].snippet.channelTitle.toString()
                .length >= 25 ? (
                <b>{`${youtubeData.items[index].snippet.channelTitle
                  .toString()
                  .replace(/&#39;/g, "'")
                  .substr(0, 25)}...`}</b>
              ) : (
                <b>{`${youtubeData.items[index].snippet.channelTitle
                  .toString()
                  .replace(/&#39;/g, "'")
                  .substr(0, 25)}`}</b>
              )}
            </Typography.Title>

            <Typography.Title className="Grid-CountViews">
              <b>{`${youtubeStatistics[index]} просмотров`}</b>
            </Typography.Title>
          </div>
        </Col>
      );
      }
    }

  for (let i = 0; i <= columnsOfRow.length; i++) {
    if (i !== columnsOfRow.length) {
      forRows.push(columnsOfRow[i]);
    }

    if (i % 4 === 0 && i !== 0 && i !== columnsOfRow.length) {
      containerForRows.push(
        <Row gutter={20} className="Grid-Row" key={Math.random()}>
          {columnsOfRow[i - 4]}
          {columnsOfRow[i - 3]}
          {columnsOfRow[i - 2]}
          {columnsOfRow[i - 1]}
        </Row>,
      );
    }

    if (i === columnsOfRow.length) {
      const mod = columnsOfRow.length % 4;
      const tempColumns = [];

      for (let j = 0; j < mod; j++) {
        tempColumns.push(
          columnsOfRow[columnsOfRow.length - j - 1],
        );
      }

      containerForRows.push(
        <Row gutter={20} className="Grid-Row" key={Math.random()}>
          {tempColumns.map((element) => element)}
        </Row>,
      );
    }
  }

  return (
    <>
      {
      containerForRows.map((element) => element)
}
    </>
  );
};


export default GridYoutube;
