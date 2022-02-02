import { useContext, useReducer, useLayoutEffect, useRef } from 'react'
import ReactReduxContext from '../Context'

const refEquality = (a, b) => a === b

function useSelectorWithStoreAndSubscription(selector, equalityFn, store){
  const [, forceRender] = useReducer((s) => s + 1, 0);
  const latestSelector = useRef()
  const latestStoreState = useRef()
  const latestSelectedState = useRef()

  const storeState = store.getState()
  let selectedState = latestSelectedState.current;

  if (storeState !== latestStoreState.current) {
    const newSelectedState = selector(storeState);

    if (latestSelectedState.current === undefined || !equalityFn(newSelectedState, latestSelectedState.current)) {
      selectedState = newSelectedState;
    } else {
      selectedState = latestSelectedState.current;
    }
  }

  useLayoutEffect(() => {
    latestSelector.current = selector;
    latestStoreState.current = storeState;
    latestSelectedState.current = selectedState;
  })
  useLayoutEffect(() => {
    function checkForUpdates() {

      const newStoreState = store.getState();
      if (newStoreState === latestStoreState.current) {
        return;
      }

      const _newSelectedState = latestSelector.current(newStoreState);

      if (equalityFn(_newSelectedState, latestSelectedState.current)) {
        return;
      }

      latestSelectedState.current = _newSelectedState;
      latestStoreState.current = newStoreState;
    
      forceRender();
    }

    store.subscribe(checkForUpdates)
    checkForUpdates();
  }, [store])
  return selectedState
}
export function createSelectorHook() {
  return function useSelector(selector, equalityFn = refEquality) {
    const contextValue = useContext(ReactReduxContext)
    const store = contextValue.store
    const selectedState = useSelectorWithStoreAndSubscription(selector, equalityFn, store);
    return selectedState;
  }
}

export default createSelectorHook()
