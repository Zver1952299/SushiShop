import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton: React.FC = (props) => (
  <ContentLoader
    className="item_wrapper"
    speed={2}
    width={225}
    height={350}
    viewBox="0 0 225 350"
    backgroundColor="#fafafa"
    foregroundColor="#f0f0f0"
    {...props}>
    <rect x="28" y="30" rx="0" ry="0" width="167" height="92" />
    <rect x="39" y="156" rx="0" ry="0" width="148" height="28" />
    <rect x="27" y="202" rx="0" ry="0" width="174" height="44" />
    <rect x="35" y="260" rx="0" ry="0" width="58" height="22" />
    <rect x="137" y="260" rx="0" ry="0" width="58" height="22" />
    <rect x="24" y="296" rx="0" ry="0" width="70" height="31" />
    <circle cx="194" cy="312" r="16" />
  </ContentLoader>
);

export default Skeleton;
