export default () => {
  const pnApp = {
    setConfig: async function () {
      return await fetch(`${location.origin}/api-config`)
        .then(async (res) => {
          if (!res.ok) {
            throw new Error('Cannot fetch config');
          } else {
            pnApp.config = await res.json();
            console.log(pnApp.config)
          }
        });
    },
  };
  return pnApp;
};