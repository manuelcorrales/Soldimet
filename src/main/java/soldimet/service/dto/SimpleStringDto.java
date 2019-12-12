package soldimet.service.dto;

/**
 * SimpleStringDto
 */
public class SimpleStringDto {

    private String response;

    public  SimpleStringDto(String response) {
        this.response = response;
    }

    /**
     * @return the response
     */
    public String getResponse() {
        return response;
    }

    /**
     * @param response the response to set
     */
    public void setResponse(String response) {
        this.response = response;
    }
}
