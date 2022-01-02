/* eslint-disable @typescript-eslint/no-explicit-any */

interface Result {
  successful: boolean;
  errorMesg?: string | Error,
  data: any;
}

function formatResponse(data: any, errorMesg?: string | Error): Result {
  if (errorMesg instanceof Error) {
    return {
      successful: false,
      errorMesg: errorMesg,
      data: null
    }
  } else if (typeof errorMesg === 'string') {
    return {
      successful: false,
      errorMesg: errorMesg,
      data: null
    }
  }
  return {
    successful: true,
    data: data
  }
}

export default formatResponse;