import axios from 'axios';

export interface InterestParams {
  initial: number;
  deposit_amount: number;
  interest_rate: number;
}

export interface InterestResponse {
  xAxis: number[];    
  yAxis: number[];    
}

export async function fetchProjections(params: InterestParams): 
Promise<InterestResponse>
{
    const { data } = await axios.post<InterestResponse>('/api/interest-data/', params);
    return data;
}
