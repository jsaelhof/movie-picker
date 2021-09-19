export const parseRuntime = (runtimeInput) => {
  let runtime;

  // Convert the runtime input to seconds
  if (!runtimeInput || runtimeInput === "") {
    runtime = null;
  } else {
    const [hours, minutes] = runtimeInput.includes(":")
      ? runtimeInput.split(":")
      : [0, runtimeInput];

    runtime = (hours ? hours * 3600 : 0) + (minutes ? minutes * 60 : 0);
  }

  return runtime;
};
