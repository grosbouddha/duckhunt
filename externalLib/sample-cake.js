createRectangle = function()
{
	var rect = new Rectangle();
	rect.width = 50;
	rect.height = 50;
	rect.centered = true;
	rect.cx = Math.random() * 500;
	rect.cy = Math.random() * 300;
	rect.stroke = false;
	rect.fill = gradient;
	rect.xDir = Math.random() > 0.5?1:-1;
	rect.yDir = Math.random() > 0.5?1:-1;

	rect.addFrameListener(function(t, dt)
		{
			this.cx += this.xDir * 50 * dt/1000;
			this.cy += this.yDir * 50 * dt/1000;
			if (this.cx > 550)
			{
				this.xDir = -1;
			}
			if (this.cx < 50)
			{
				this.xDir = 1;
			}
			if (this.cy > 350)
			{
				this.yDir = -1;
			}
			if (this.cy < 50)
			{
				this.yDir = 1;
			}
		}
	);

	CAKECanvas.append(rect);
}

window.onload = function()
{
	CAKECanvas = new Canvas(document.body, 600, 400);
	blurFill = "rgba(0,0,0, 0.1)";
	normalFill = "rgba(0, 0, 0, 1)";
	CAKECanvas.fill = blurFill;

	var buttonNormalImage = Object.loadImage("button.png");
	var buttonHoverImage = Object.loadImage("button2.png");
	var blurButton = new ImageNode(buttonNormalImage);
	blurButton.zIndex = 10;
	blurButton.x = 10;
	blurButton.y = 10;
	blurButton.blurEnabled = true;

	blurButton.addEventListener('click', function(ev)
		{
			this.blurEnabled = !this.blurEnabled;
			if (this.blurEnabled)
			{
				CAKECanvas.fill = blurFill;
			}
			else
			{
				CAKECanvas.fill = normalFill;
			}
		}
	);

	blurButton.addEventListener('mouseover', function(ev)
		{
			this.image = buttonHoverImage;
		}
	);

	blurButton.addEventListener('mouseout', function(ev)
		{
			this.image = buttonNormalImage;
		}
	);

	CAKECanvas.append(blurButton);

	gradient = new Gradient(
		{
			type: 'radial',
			endRadius: 600,
			colorStops:
			[
				[0, [255, 0, 0]],
				[1, [0, 100, 255]]
			]
		}
    );

	for (var i=0; i < 25; ++i)
	{
		createRectangle(createRectangle);
	}
};