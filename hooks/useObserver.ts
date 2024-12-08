interface Props {
  root: HTMLElement | null;
  params?: IntersectionObserverInit;
}

const useObserver = ({ root, params }: Props) => {
  const options: IntersectionObserverInit = params || {
    root: root,
    threshold: 0.1,
  };

  const observer = (callBack: () => void) => {
    const callback: IntersectionObserverCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          callBack();
          observer.unobserve(entry.target);
          observer.disconnect();
        }
      });
    };

    return new IntersectionObserver(callback, options);
  };

  return observer;
};

export default useObserver;
