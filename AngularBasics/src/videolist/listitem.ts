export interface Listitem {
    
        fileName: string;
        fileId: Date; 
        user:string;
        fileType:string;
        

}

export interface pagination{
        $skip:number;
        $top:number;
}