import React from "react";
import { InputGroup, FormControl } from "react-bootstrap"

interface Props {
  value: string;
  handleFilter: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Filter: React.FC<Props> = ({ value, handleFilter }) => {
  return (
    <React.Fragment>
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text id="inputGroup-sizing-default">
            Filter
          </InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          aria-label="Filter"
          aria-describedby="inputGroup-sizing-default"
          value={value}
          onChange={handleFilter}
          data-testid="input-filter"
        />
      </InputGroup>
    </React.Fragment>
  );
};

export default Filter;
