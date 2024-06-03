import styles from "./BlogPagination.module.css";
import {Pagination} from "antd";
import { BlogPaginationProps } from "./BlogPagination.props";

 const BlogPagination: React.FC<BlogPaginationProps> = ({ current, total, onChange }: BlogPaginationProps) => {
return (
     <Pagination
    defaultCurrent={current}
    total={total}
    onChange={onChange}
    pageSize={1}
    showSizeChanger={false}
  className={styles["pagination"]}
    hideOnSinglePage
  />)
}

export default BlogPagination;