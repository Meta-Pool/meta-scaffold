export const getUserMates = async () => {
    const account_id = window.account_id;
    const response = await fetch(`/api/mates/${account_id}`);
    return await response.json();
  };
  
  