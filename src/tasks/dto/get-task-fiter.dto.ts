import { IsEnum, IsOptional } from "class-validator";
import { TaskStatus } from "../tasks.model";

export class GetTaskFilterDto {
    @IsOptional()
    search?: string;
    @IsOptional()
    @IsEnum(TaskStatus)
    status?: TaskStatus;
}