export class Utils {
    static elementWidth(element: HTMLElement | null) {
        if (element == null) {
            return 0;
        }

        return element.clientWidth -
            parseFloat(window.getComputedStyle(element, null).getPropertyValue("padding-left")) -
            parseFloat(window.getComputedStyle(element, null).getPropertyValue("padding-right"));
    }

    static elementHeight(element: HTMLElement | null) {
        if (element == null) {
            return 0;
        }

        return element.clientHeight -
            parseFloat(window.getComputedStyle(element, null).getPropertyValue("padding-top")) -
            parseFloat(window.getComputedStyle(element, null).getPropertyValue("padding-bottom"));
    }
}
