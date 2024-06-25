import { Pagination, ConfigProvider } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { blogAction } from "../../store/blogs.slice";
import { AppDispatcher, RootState } from "../../store/store";

import { BlogPaginationProps } from "./BlogPagination.props";
import styles from "./BlogPagination.module.css";

const BlogPagination: React.FC<BlogPaginationProps> = ({
  totalResults,
}: BlogPaginationProps) => {
  const dispatch = useDispatch<AppDispatcher>();
  const currentPage = useSelector((s: RootState) => s.blogs.currentPage);

  const changeCurrentPage = (currentPage: number): void => {
    dispatch(blogAction.setPage(currentPage));
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Pagination: {
            itemActiveBg: "#1890FF",
            lineWidth: 0,
            colorPrimary: "#FFF",
            colorPrimaryHover: "#FFF",
          },
        },
      }}
    >
      <Pagination
        defaultCurrent={1}
        total={totalResults}
        pageSize={5}
        showSizeChanger={false}
        current={currentPage}
        onChange={changeCurrentPage}
        hideOnSinglePage
        className={styles["pagination"]}
      />
    </ConfigProvider>
  );
};

export default BlogPagination;
