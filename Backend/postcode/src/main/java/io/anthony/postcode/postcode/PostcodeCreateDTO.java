package io.anthony.postcode.postcode;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PostcodeCreateDTO {
	
	@NotBlank(message="Name cannot be blank")
	private String name;
	
	@NotBlank(message="Postcode cannot be blank")
	private String postcode;
	
	@NotBlank(message="State cannot be blank")
	private String state;
	
	@NotBlank(message="Local Government cannot be blank")
	private String lga;
	
	
	private int population;

}
