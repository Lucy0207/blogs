import styles from "./DeleteConfirmation.module.css"

import { Button, message, Popconfirm } from 'antd';
import { DeleteConfirmationProps } from "./DeleteConfrimation.props";




const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({onConfirm}) => (
  <Popconfirm
    title="Are you sure to delete this task?"
    description=""
    onConfirm={
        () => {
      onConfirm();
      message.success('Your post has been successfully deleted');
    }
    }
 
    okText="Yes"
    cancelText="No"
    placement='rightTop'
    className={styles["delete-button"]}
  >
    <Button danger>Delete</Button>
  </Popconfirm>
);

export default DeleteConfirmation;