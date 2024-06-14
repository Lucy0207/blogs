import Headling from "../Headling/Headling";
import NavigationButton from "../NavigationButton/NavigationButton";
import Button from "../Button/Button";
import styles from "./Article.module.css";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { ArticleFormProps } from "./Article.props";

export type FormProps = {
  title: string;
  description: string;
  body: string;
  username?: string;
  tags: { name: string }[];
};

const ArticleForm = ({ articleTitle, handleOnSubmit }: ArticleFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<FormProps>({
    defaultValues: {
      title: '',
      description: '',
      body: '',
      username: '',
      tags: [{ name: '' }]
    }
  });

  const { fields, prepend, remove } = useFieldArray({
    name: "tags",
    control,
    rules: {
      required: "Please add at least one tag",
      minLength: 1
    }
  });

  const onSubmit: SubmitHandler<FormProps> = (data) => {
    handleOnSubmit(data);
    console.log("Form submitted", data);
  };

  return (
    <div className={styles["article"]}>
      <Headling>{articleTitle}</Headling>
      <form className={styles['form']} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles['field']}>
          <label htmlFor="title">Title</label>
          <input
            id='title'
            type="text"
            placeholder='Title'
            {...register("title", {
              required: "The title is required",
              minLength: {
                value: 3,
                message: "Minimum 3 characters",
              },
              maxLength: { value: 35, message: "Maximum 35 characters" },
            })}
          />
          {errors.title && <p className={styles["error"]}>{errors.title.message}</p>}
        </div>

        <div className={styles['field']}>
          <label htmlFor="description">Short description</label>
          <input
            id='description'
            type="text"
            placeholder='Short description'
            {...register("description", {
              required: "Short description is required",
              minLength: {
                value: 3,
                message: "Minimum 3 characters",
              },
              maxLength: { value: 35, message: "Maximum 35 characters" },
            })}
          />
          {errors.description && <p className={styles["error"]}>{errors.description.message}</p>}
        </div>

        <div className={styles['field']}>
          <label htmlFor="body">Text</label>
          <textarea
            id='body'
            placeholder='Text'
            rows={10}
            {...register("body", {
              required: "Text is required"
            })}
          />
          {errors.body && <p className={styles["error"]}>{errors.body.message}</p>}
        </div>

        <label>Tags</label>
        {fields.map((field, index) => (
          <section key={field.id}>
            <div className={styles['field']}>
              <div className={styles["tag-field"]}>
                <input
                  type='text'
                  placeholder='Tags'
                  {...register(`tags.${index}.name`, {
                    required: "Enter a tag name"
                  })}
                />
                <NavigationButton
                  onClick={() => remove(index)}
                  appearance="medium">Delete</NavigationButton>
              </div>
       {errors.tags?.[index]?.name && (
                <p className={styles["error"]}>{errors.tags[index]?.name?.message}</p>
              )} 
            </div>
          </section>
        ))}

        <NavigationButton
          onClick={() => prepend({ name: "" })}
          appearance="medium">Add tag</NavigationButton>

        {errors.tags?.root?.message && <p className={styles["error"]}>{errors.tags.root.message}</p>}

        <Button type="submit" className={styles["form-button"]}>Send</Button>
      </form>
    </div>
  );
};

export default ArticleForm;
