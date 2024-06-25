import { ConfigProvider, Spin } from "antd";

const Loader: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "25%",
      }}
    >
      <ConfigProvider
        theme={{
          token: {
            controlHeight: 150,
          },
        }}
      >
        <Spin />
      </ConfigProvider>
    </div>
  );
};

export default Loader;
