import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'nxlp-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})

export class ButtonComponent implements OnInit {
  @Input() color = 'color-green';
  @Input() text = 'Edit';
  @Input() icon: string;

  constructor() { }

  ngOnInit(): void {}
}
