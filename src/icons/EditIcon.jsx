import styled from "styled-components";
const Wrapper = styled.div`
  cursor: pointer;
  width: 12px;
  height: 12px;
  & svg {
    margin-bottom: 5px;
    vertical-align: baseline;
  }
`;
export default function EditIcon(props) {
  return (
    <Wrapper {...props}>
      <svg viewBox="0 0 512 512">
        <path
          fill="currentColor"
          d="M497.9 142.1l-46.1 46.1c-4.7 4.7-12.3 4.7-17 0l-111-111c-4.7-4.7-4.7-12.3 0-17l46.1-46.1c18.7-18.7 49.1-18.7 67.9 0l60.1 60.1c18.8 18.7 18.8 49.1 0 67.9zM284.2 99.8L21.6 362.4.4 483.9c-2.9 16.4 11.4 30.6 27.8 27.8l121.5-21.3 262.6-262.6c4.7-4.7 4.7-12.3 0-17l-111-111c-4.8-4.7-12.4-4.7-17.1 0zM88 424h48v36.3l-64.5 11.3-31.1-31.1L51.7 376H88v48z"
        ></path>
      </svg>
    </Wrapper>
  );
}
