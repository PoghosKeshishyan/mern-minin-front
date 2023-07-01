export function useMessage() {
    return function(text) {
        if(window.M && text) {
            window.M.toast({html: 'text'});
        }
    }
}