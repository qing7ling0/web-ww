import styled from 'styled-components'

const Hx = styled.h1`
  text-align: center;
  color: #fff;
`


export const H1 = Hx.extend`
  font-size: 0.15em;
`
export const H2 = Hx.extend`
  font-size: 0.12em;
`
export const Title = styled.span`
  font-size: 0.1rem;
  color: #333;
`
export const TitleSmall = Title.extend`
  font-size: 0.08rem;
  color: #333;
`
export const TitleLarge = Title.extend`
  font-size: 0.12rem;
`
export const Label = styled.span`
  font-size: 0.08rem;
  color: #555;
`
export const LabelSmall = Label.extend`
  font-size: 0.06rem;
`
export const LabelLarge = Label.extend`
  font-size: 0.1rem;
`