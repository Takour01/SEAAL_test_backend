import { BadRequestException, ForbiddenException, InternalServerErrorException, UnprocessableEntityException } from "@nestjs/common"

export class ErrorsUtil {
    public static errorHandler(error: any) {
        if (error?.code) {
            const num = Number(error.code.split('P')[1]) || 0
            if (num >= 2000 && num < 3000) {
                switch (error.code) {
                    // Data-related errors
                    case "P2001":
                        throw new UnprocessableEntityException(
                            `Invalid foreign key relationship. Check the referenced field.`
                        );
                    case "P2002":
                        throw new UnprocessableEntityException(`${error.meta.target} in ${error.meta.modelName} must be uniqe`);
                    case "P2003":
                        const name = error.meta.target;
                        throw new UnprocessableEntityException(
                            `Invalid value for field '${name}'. Please check the data format.`
                        );
                    case "P2046":
                        const field = error.meta.target;
                        const expectedType = error.meta.expected;
                        throw new UnprocessableEntityException(
                            `Field '${field}' expects a value of type '${expectedType}' but received '${error.meta.value}'.`
                        );
                    default:
                        throw new BadRequestException("Data-related Errors");
                }
            } else if (num >= 3000 && num < 4000) {
                switch (error.code) {
                    case "P3000":
                        throw new InternalServerErrorException(
                            "Database connection failed. Please try again later."
                        );
                    case "P3013":
                        throw new ForbiddenException("Invalid credentials. Please check your username and password.");

                    default:
                        throw new BadRequestException("bad connection error");
                }

            }
            else if (num >= 4000 && num < 5000) {
                switch (error.code) {
                    case "P4000":
                        throw new InternalServerErrorException(
                            "An error occurred while analyzing your database schema. Please contact support."
                        );

                    // Handle other specific cases here, e.g., validation errors, authorization errors

                    // Fallback for unexpected errors
                    default:
                        throw new InternalServerErrorException("Something went wrong. Please try again later.");
                }
            }
            else {
                throw new BadRequestException("Something went wrong. Please try again later.");
            }
        } else if (error?.response?.error) {
            throw error
        }
        else {
            // Handle errors without a code property
            throw new BadRequestException("Something went wrong. Please try again later.");
        }
    }
}