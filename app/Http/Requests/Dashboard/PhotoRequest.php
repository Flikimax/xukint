<?php

namespace App\Http\Requests\Dashboard;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Support\Str;

class PhotoRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return $this->user();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        // dd($this->get('slug'));

        $id = $this->get('id');
        $slug = $this->get('slug');





        return [
            'photo_category_id' => 'required|integer',
            'title' => 'required|string',
            'description' => 'nullable|string',
            'photo' => 'mimes:jpg,jpeg,png', 
            'slug' => [
                'required',
                'string',
                Rule::unique('photos')->ignore($slug, 'slug'),
            ],
            'nsfw' => 'required',
        ];
    }

    /**
     * Prepare the data for validation.
     *
     * @return void
     */
    protected function prepareForValidation()
    {
        $this->merge([
            'slug' => Str::slug($this->title),
        ]);
    }
}
