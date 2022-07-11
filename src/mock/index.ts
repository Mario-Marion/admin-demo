import Mock from "mockjs"

interface MockReturnType { url: string, type: string, response: any }
const syncModule = import.meta.globEager('@/mock/modules/*.ts');
for (const path in syncModule) {
  const obj: MockReturnType[] = syncModule[path].default;
  for (const item of Object.values(obj)) {
    const { url, type, response } = item;
    Mock.mock(url, type, response)
  }
}


