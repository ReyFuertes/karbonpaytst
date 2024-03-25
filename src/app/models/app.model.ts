export interface IOptionValue {
  label: string;
  value?: string | undefined;
  isActive?: boolean;
  icon?: string;
  action?: () => void;
}

export interface IAppItem extends ActiveApp { 
  name?: string, 
  value?: any, 
  icon?: string 
}

export interface ActiveApp {
  active?: boolean, 
  color?: string
}