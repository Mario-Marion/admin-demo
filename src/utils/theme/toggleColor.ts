import useColour from "./colour"

function useToggleColor(theme: string) {
  let { darkList, lightList } = useColour();
  const el = ref(null)
  if (theme === 'dark') {
    darkList.value.forEach(item => {
      const colorVal = useCssVar(item.name, el);
      colorVal.value = item.value
    })
  } else {
    lightList.value.forEach(item => {
      const colorVal = useCssVar(item.name, el);
      colorVal.value = item.value
    })
  }
}

export default useToggleColor