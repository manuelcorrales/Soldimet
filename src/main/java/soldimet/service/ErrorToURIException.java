package soldimet.service;

import org.zalando.problem.AbstractThrowableProblem;
import org.zalando.problem.Status;

import soldimet.web.rest.errors.ErrorConstants;

import java.net.URI;
import java.util.HashMap;
import java.util.Map;

public class ErrorToURIException  extends RuntimeException {

    private static final long serialVersionUID = 1L;

    private final String entityName;

    private final String errorKey;

    public ErrorToURIException(String defaultMessage, String entityName, String errorKey) {
        super(defaultMessage);
        this.entityName = entityName;
        this.errorKey = errorKey;
    }

    public String getEntityName() {
        return entityName;
    }

    public String getErrorKey() {
        return errorKey;
    }

}
