import styled from 'styled-components';

type Props = {
  as: string;
};

export const AuthForm = styled.form`
  max-width: 360px;
  margin: 60px auto;
  padding: 40px;
  border: 1px solid #ddd;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.05);
  background: #fff;
`;

export const CreateFormWrapper = styled.div`
  max-width: 600px;
`;

export const CommentForm = styled.form`
  & > label {
    margin-bottom: 0px;
  }
  & > textarea {
    min-height: 40px;
    font-size: 1.5em;
  }
  & > button {
    margin-top: 10px;
  }
`;

export const Label = styled.label`
  display: block;
  margin: 24px auto;
  & > span {
    display: block;
    margin-bottom: 6px;
  }
`;

export const Input = styled.input.attrs((props: Props) => ({
  as: props.as || '',
}))`
  padding: 8px 6px;
  font-size: 1em;
  color: #777;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-height: ${(props) => props.as === 'textarea' && '160px'};
`;
