import React from 'react';


type Props = { values: { bgcolor: string }[]; language: string;};

const ProgressBar = ({ values, language }: Props): JSX.Element => {
  const segmentWidth = 100 / values.length;

  const progressBarContainer = {
    height: "60px",
    width: '100%',
    backgroundColor: "red",
    display: 'flex',
    borderRadius: 5,
  };

  const progressBarTextContainer = {
    color: "white",
    fontSize: "16px",
  };
  const getBorderRadius = (progressBarIndex: number) => {
    if (progressBarIndex === 0) return '8px 0px 0px 8px';
    if (progressBarIndex === values.length - 1) return '0px 8px 8px 0px';
    return '0px 0px 0px 0px';
  };
  const getBorderRadiusRTL = (progressBarIndex: number) => {
    if (progressBarIndex === 0) return '0px 8px 8px 0px';
    if (progressBarIndex === values.length - 1) return '8px 0px 0px 8px';
    return '0px 0px 0px 0px';
  };

  return (
    <bdo dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div style={progressBarContainer}>
        {/* <div style={ progressBarContainer }> */}
        {values.map((item, index) => {
          return (
            <div
              id={`question${index + 1}`}
              style={{
                height: '100%',
                width: `${segmentWidth}%`,
                background: item.bgcolor,
                borderRadius: language !== 'ar' ? getBorderRadius(index) : getBorderRadiusRTL(index),
              }}
            >
              <div style={progressBarTextContainer} />
              {index !== 0 && <div style={{ borderRight: `1px solid black`, height: '100%' }} />}
            </div>
          );
        })}
      </div>
    </bdo>
  );
};

export default ProgressBar;
