interface FormFieldItem {
  fieldName: FieldNameTypes;
  labelText: string;
  component: (field: ControllerRenderProps<any, FieldNameTypes>) => React.ReactNode;
}

type FieldNameTypes =
  | "user_id"
  | "user_nickname"
  | "user_server"
  | "user_race"
  | "user_password"
  | "user_password_confirm";
