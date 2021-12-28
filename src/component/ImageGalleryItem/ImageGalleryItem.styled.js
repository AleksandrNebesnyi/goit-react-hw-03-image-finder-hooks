import styled from "@emotion/styled";

export const Item = styled.li`
border-radius: 2px;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);
}

`;


export const Img = styled.img`
width: 100%;
height: 260px;
object-fit: cover;
transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1);

opacity: 1;

&:hover,
&:focus {
  opacity: 0.9;
  transform: scale(1.02);
  cursor: zoom-in;

  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
}
`;