from pydantic import BaseModel, Field

class HouseFeatures(BaseModel):
    longitude: float = Field(..., description="Longitude of the block", example=-122.23)
    latitude: float = Field(..., description="Latitude of the block", example=37.88)
    housing_median_age: float = Field(..., description="Median age of houses in the block", example=41.0)
    total_rooms: float = Field(..., description="Total number of rooms in the block", example=880.0)
    total_bedrooms: float = Field(..., description="Total number of bedrooms in the block", example=129.0)
    population: float = Field(..., description="Population in the block", example=322.0)
    households: float = Field(..., description="Number of households in the block", example=126.0)
    median_income: float = Field(..., description="Median income in tens of thousands", example=8.3252)
    ocean_proximity: str = Field(..., description="Ocean proximity category", example="NEAR BAY")
