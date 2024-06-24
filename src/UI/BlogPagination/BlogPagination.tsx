import styles from "./BlogPagination.module.css"
import {Pagination, ConfigProvider  } from "antd";
import { BlogPaginationProps } from "./BlogPagination.props";
import { blogAction } from "../../store/blogs.slice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatcher, RootState } from "../../store/store";

 const BlogPagination: React.FC<BlogPaginationProps> = ({ totalResults }: BlogPaginationProps) => {

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
            itemActiveBg: '#1890FF',
            lineWidth: 0,
            colorPrimary: '#FFF',
            colorPrimaryHover: '#FFF',
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
        hideOnSinglePage={true}
        className={styles["pagination"]}
      />
    </ConfigProvider>
  );
}

export default BlogPagination;