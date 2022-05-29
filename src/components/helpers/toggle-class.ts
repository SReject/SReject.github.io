export default (ele: HTMLElement, className: string | string[]) => {
    if (typeof className === 'string') {
        className = className.split(' ');
    }

    const eleClasses = ele.className.split(' ');

    className.forEach(cls => {
        let idx = eleClasses.indexOf(cls);
        if (idx === -1) {
            eleClasses.push(cls);
        } else {
            eleClasses.splice(idx, 1);
        }
    });

    ele.className = eleClasses.join(' ');
};