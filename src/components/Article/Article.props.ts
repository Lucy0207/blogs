import { FormProps } from "./ArticleForm";
export interface ArticleFormProps {
  articleTitle: string;
  handleOnSubmit: (data: FormProps) => void;
}
