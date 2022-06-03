import Content from "../../entities/content";

type CreateContentDTO = Pick<
  Content,
  | "title"
  | "description"
  | "thumbnail"
  | "published"
  | "sourceDuration"
  | "sourceSize"
>;

export default CreateContentDTO;
