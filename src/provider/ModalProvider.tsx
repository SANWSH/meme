import React, { type PropsWithChildren } from 'react'
import ModalContext from '../context/ModalContext'

interface IModalProvider extends PropsWithChildren {
  show: () => void|null;
  hide: () => void|null;
  isOpen: boolean | null;
}

export default function ModalProvider( props: IModalProvider ) {
  return (
    <ModalContext value={props}> {props.children} </ModalContext>
  )
}
