interface createWrapperOptions {
    type?: string;
    prefix?: string;
}

type createOptions = string | Record<string, any>;

export default (options?: createWrapperOptions) => {
    let defaultType = 'div',
        prefix = '';

    if (options != null) {
        if (options.type != null) {
            defaultType = options.type;
        }
        if (options.prefix != null) {
            prefix = options.prefix;
        }
    }

    return (type?: string | createOptions, options?: createOptions): HTMLElement => {
        let createType: string,
            createOptions: createOptions;

        if (type != null && typeof type !== 'string') {
            createOptions = type;
            createType = defaultType;

        } else if (type == null) {
            createType = defaultType;

        } else {
            createType = type as string;
            createOptions = options;
        }

        const ele = document.createElement(createType);

        if (createOptions == null) {
            return ele;
        }

        if (typeof createOptions === 'string') {
            ele.textContent = createOptions;
            return ele;
        }

        Object
            .keys(createOptions)
            .forEach(key => {
                let value = createOptions[key];

                if (key === 'class') {
                    if (typeof value === 'string') {
                        ele.className = (ele.className.split(' ').concat([value])).join(' ');
                    } else if (Array.isArray(value)) {
                        ele.className = (ele.className.split(' ').concat(value)).join(' ');
                    }

                } else if (key === 'preclass') {
                    if (typeof value === 'string') {
                        value = value.split(/\s+/g);
                    }
                    if (Array.isArray(value)) {
                        let prefixedClasses = value.map((value: string) => prefix + value);
                        ele.className = (ele.className.split(' ').concat(prefixedClasses)).join(' ');
                    }

                } else if (key === 'parent') {
                    value.appendChild(ele);

                } else if (key === 'children') {
                    value.forEach((child: HTMLElement) => {
                        ele.appendChild(child);
                    });
                } else if (key === 'text') {
                    ele.textContent = value;

                } else if (key.substring(0, 2) === 'on') {
                    ele.addEventListener(key.substring(2), value);

                } else {
                    ele.setAttribute(key, value);
                }
            });

        return ele;
    };
};