package kosa.afnica.backend.api.controller;

import kosa.afnica.backend.api.service.CarcenterService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class CarcenterController {

    private final CarcenterService carcenterService;

}
