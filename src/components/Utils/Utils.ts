import numeral from "numeral";

export const Humanize = (value:any): string => {
    return(
        numeral(value).format('0,0.00').replaceAll(',',' ').replace('.',',')
    );
};





export const Transform =(formData:any):any => {
   
    const newFormData:any=new FormData();
    for (const key in formData) {
        if (formData.hasOwnProperty(key)) {
            if (Array.isArray(formData[key]) && formData[key].length > 0) {
                newFormData.append(key,formData[key][0].value)
                
            }
            if (!Array.isArray(formData[key])) {
                newFormData.append(key,formData[key])
            }
            
        }
    }
    return newFormData
}


export const formatDate = (dateTimeString: string): string => {
  const date = new Date(dateTimeString);

  // Format options
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };

  // Format the date and time
  const formattedDateTime: string = date.toLocaleString('en-US', options);

  return formattedDateTime;
};