import React, { useEffect, useState } from "react";
import { Form, FormControl, Button, InputGroup } from "react-bootstrap";

type Props = {
  saveTodo: (e: React.FormEvent, formData: ITodo | any) => void;
  isAdded: Boolean;
};

const AddTodo: React.FC<Props> = ({ saveTodo, isAdded }) => {
  const [formData, setFormData] = useState<ITodo | {}>();
  const [btnState, setBtnState] = useState(true);

  const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.currentTarget.id]: e.currentTarget.value,
    });

    // 'Add' button is only disabled if input is empty
    if (e.currentTarget.value !== "") {
      setBtnState(false);
    } else {
      setBtnState(true);
    }
  };

  useEffect(() => {
    if (isAdded) {
      /* We clear/reset the input text and disable the 'Add' button 
        after a successful todo addition/creation
      */
      let form = document.getElementById("name");
      if (form) (form as HTMLInputElement).value = "";
      setBtnState(true);
    }
  }, [isAdded]);

  return (
    <React.Fragment>
      <Form className="Form" onSubmit={(e) => saveTodo(e, formData)}>
        <InputGroup>
          <FormControl
            placeholder="What needs to be done?"
            aria-label="What needs to be done"
            aria-describedby="basicInputName"
            type="text"
            id="name"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleForm(e)}
          />
          <InputGroup.Append>
            <Button
              className="add-btn"
              disabled={btnState}
              onClick={(e) => saveTodo(e, formData)}
            >
              Add
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </Form>
    </React.Fragment>
  );
};

export default AddTodo;
