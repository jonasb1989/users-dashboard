import { Table as AntdTable } from "antd";

import "./index.less";

const { Column } = AntdTable;

const Table = (props) => {
  const { columns = [], data = [] } = props;

  return (
    <AntdTable dataSource={data}>
      {columns.map(({ title, dataIndex, key, render }) => (
        <Column title={title} dataIndex={dataIndex} key={key} render={render} />
      ))}
    </AntdTable>
  );
};

export default Table;
