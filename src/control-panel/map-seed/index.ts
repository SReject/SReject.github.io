import createWrapper from '../../components/helpers/create';

import { Group } from '../../components'

const create = createWrapper({
    prefix: 'group-'
});

let inputElement = create('input', {
    type: 'text',
    value: Date.now().toString()
});

const group = new Group({
    title: 'Map Seed',
    children: [
        inputElement,
        create('button', {
            text: 'R',
            onclick: () => {
                (inputElement as HTMLInputElement).value = Math.round(Date.now() * Math.random()).toString();
            }
        })
    ]
})

export const element = group.element;
export const getSettings = (): string => (inputElement as HTMLInputElement).value;