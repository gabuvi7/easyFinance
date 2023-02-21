/* eslint-disable react/require-default-props */

'use client';

import { Skeleton as AntdSkeleton } from 'antd';

interface ISkeletonArgs {
  active?: boolean;
  avatar?: boolean;
  loading?: boolean;
  paragraph?: boolean;
  round?: boolean;
  title?: boolean;
}

function Skeleton(props: ISkeletonArgs) {
  return <AntdSkeleton {...props} />;
}
export default Skeleton;
