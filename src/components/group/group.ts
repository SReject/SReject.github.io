import "./group.css";

import toggleCssClass from '../helpers/toggle-class';
import createWrapper from '../helpers/create';

interface GroupOptions {
    title: string;
    collapsable?: boolean;
    children?: HTMLElement[]
}

export default class GroupControl {
    private wrapperElement: HTMLElement;
    private contentElement: HTMLElement;

    constructor(options: GroupOptions) {
        const create = createWrapper({
            type: 'div',
            prefix: 'group-'
        });

        if (options.collapsable) {
            this.wrapperElement = create({
                preclass: ['wrapper'],
                class: 'collapsable',
                children: [
                    create({
                        preclass: 'head',
                        children: [
                            create({ preclass: 'title', text: options.title })
                        ],
                        onclick: (evt: Event) => {
                            toggleCssClass(this.wrapperElement, 'expand');
                        }
                    }),
                    this.contentElement = create({
                        preclass: 'content',
                        children: options.children
                    })
                ]
            });
        } else {
            this.wrapperElement = create({
                preclass: ['wrapper'],
                children: [
                    create({
                        preclass: 'head',
                        children: [
                            create({ preclass: 'title', text: options.title })
                        ]
                    }),
                    this.contentElement = create({
                        preclass: 'content',
                        children: options.children
                    })
                ]
            });
        }
    }

    get element() {
        return this.wrapperElement;
    }

    get content() {
        return this.contentElement;
    }
}